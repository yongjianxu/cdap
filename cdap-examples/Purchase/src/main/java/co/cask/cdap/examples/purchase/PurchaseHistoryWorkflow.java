/*
 * Copyright © 2014-2016 Cask Data, Inc.
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
package co.cask.cdap.examples.purchase;

import co.cask.cdap.api.Predicate;
import co.cask.cdap.api.customaction.AbstractCustomAction;
import co.cask.cdap.api.customaction.CustomAction;
import co.cask.cdap.api.workflow.AbstractWorkflow;
import co.cask.cdap.api.workflow.WorkflowContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Implements a simple Workflow with one Workflow action to run the
 * PurchaseHistoryBuilder MapReduce.
 */
public class PurchaseHistoryWorkflow extends AbstractWorkflow {
  private static final Logger LOG = LoggerFactory.getLogger(PurchaseHistoryWorkflow.class);

  @Override
  public void configure() {
      setName("PurchaseHistoryWorkflow");
      setDescription("Workflow that runs the PurchaseHistoryBuilder");
      condition(new DummyCondition()).addAction(new DummyAction()).end();
      addMapReduce("PurchaseHistoryBuilder");
  }

  static class DummyCondition implements Predicate<WorkflowContext> {
    private static final Logger COND_LOG = LoggerFactory.getLogger(DummyCondition.class);

    @Override
    public boolean apply(WorkflowContext context) {
      LOG.info("USER PurchaseHistoryWorkflow.DummyCondition");
      COND_LOG.info("USER DummyCondition");
      return true;
    }
  }

  static class DummyAction extends AbstractCustomAction {
    private static final Logger ACT_LOG = LoggerFactory.getLogger(DummyAction.class);

    @Override
    public void run() throws Exception {
      LOG.info("USER PurchaseHistoryWorkflow.DummyAction");
      ACT_LOG.info("USER DummyAction");
    }
  }
}
