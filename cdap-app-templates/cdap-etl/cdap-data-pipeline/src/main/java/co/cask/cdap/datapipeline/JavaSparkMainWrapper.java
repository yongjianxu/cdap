/*
 * Copyright © 2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package co.cask.cdap.datapipeline;

import co.cask.cdap.api.common.RuntimeArguments;
import co.cask.cdap.api.macro.MacroEvaluator;
import co.cask.cdap.api.plugin.PluginProperties;
import co.cask.cdap.api.spark.JavaSparkExecutionContext;
import co.cask.cdap.api.spark.JavaSparkMain;
import co.cask.cdap.etl.common.DefaultMacroEvaluator;

import java.lang.reflect.Method;
import javax.annotation.Nullable;

/**
 * This class is a wrapper for the vanilla spark programs.
 */
public class JavaSparkMainWrapper implements JavaSparkMain {

  @Override
  public void run(JavaSparkExecutionContext sec) throws Exception {
    String stageName = sec.getSpecification().getProperty(ExternalSparkProgram.STAGE_NAME);

    Class<?> mainClass = sec.getPluginContext().loadPluginClass(stageName);

    // if it's a CDAP JavaSparkMain, instantiate it and call the run method
    if (mainClass.isAssignableFrom(JavaSparkMain.class)) {
      MacroEvaluator macroEvaluator = new DefaultMacroEvaluator(sec.getWorkflowToken(), sec.getRuntimeArguments(),
                                                                sec.getLogicalStartTime(), sec.getSecureStore(),
                                                                sec.getNamespace());
      JavaSparkMain javaSparkMain = sec.getPluginContext().newPluginInstance(stageName, macroEvaluator);
      javaSparkMain.run(sec);
    } else {
      // otherwise, assume there is a 'main' method and call it
      String programArgs = getProgramArgs(sec, stageName);
      String[] args = programArgs == null ?
        RuntimeArguments.toPosixArray(sec.getRuntimeArguments()) : programArgs.split(" ");
      Method mainMethod = mainClass.getMethod("main", String[].class);
      Object[] methodArgs = new Object[1];
      methodArgs[0] = args;
      mainMethod.invoke(null, methodArgs);
    }
  }

  @Nullable
  private String getProgramArgs(JavaSparkExecutionContext sec, String stageName) {
    // get program args from plugin properties
    PluginProperties pluginProperties = sec.getPluginContext().getPluginProperties(stageName);
    String programArgs = pluginProperties == null ?
      null : pluginProperties.getProperties().get(ExternalSparkProgram.PROGRAM_ARGS);

    // can be overridden by runtime args
    String programArgsKey = stageName + "." + ExternalSparkProgram.PROGRAM_ARGS;
    if (sec.getRuntimeArguments().containsKey(programArgsKey)) {
      programArgs = sec.getRuntimeArguments().get(programArgsKey);
    }
    return programArgs;
  }
}
