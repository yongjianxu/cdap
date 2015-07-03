/*
 * Copyright © 2015 Cask Data, Inc.
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

package co.cask.cdap.template.etl.common;

import co.cask.cdap.api.data.format.RecordFormat;
import co.cask.cdap.template.etl.realtime.source.KafkaSource;

import java.nio.ByteBuffer;

/**
 * Format for a record contained in a {@link KafkaSource}.
 *
 * @param <T> type of object to read the byte buffer as.
 */
public abstract class KafkaEventRecord<T> extends RecordFormat<ByteBuffer, T> {

}
