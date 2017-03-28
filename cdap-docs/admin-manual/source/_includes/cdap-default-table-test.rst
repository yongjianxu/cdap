
General
-------

+------------------------------------------------------------------------------------------------------------+
| Property Name                                                                                              |
+============================================================================================================+
| ``hdfs.lib.dir``                                                                                           |
+-----------------+-----------------+------------------------------------------------------------------------+
|                 | *Default Value* | ``${hdfs.namespace}/lib``                                              |
+                 +-----------------+------------------------------------------------------------------------+
|                 | *Description*   | Common directory in HDFS for, among others, JAR files for coprocessors |
+-----------------+-----------------+------------------------------------------------------------------------+

..

1/2 width for the first column, shorter third.

+----------------------------------------------------------------------------------------------------+
| Property Name                                                                                      |
+====================================================================================================+
| ``hdfs.lib.dir``                                                                                   |
+--------+------------------+------------------------------------------------------------------------+
|        | *Default Value*  | ``${hdfs.namespace}/lib``                                              |
+        +------------------+------------------------------------------------------------------------+
|        | *Description*    | Common directory in HDFS for, among others, JAR files for coprocessors |
+--------+------------------+------------------------------------------------------------------------+

..

1/2 width for the first column, longest third.

+----------------------------------------------------------------------------------------------------------------------+
| Property Name                                                                                                        |
+======================================================================================================================+
| ``hdfs.lib.dir``                                                                                                     |
+--------+------------------+------------------------------------------------------------------------------------------+
|        | *Default Value*  | ``${hdfs.namespace}/lib``                                                                |
+        +------------------+------------------------------------------------------------------------------------------+
|        | *Description*    | Common directory in HDFS for, among others, JAR files for coprocessors                   |
+--------+------------------+------------------------------------------------------------------------------------------+
| ``hdfs.namespace``                                                                                                   |
+--------+------------------+------------------------------------------------------------------------------------------+
|        | *Default Value*  | ``/${root.namespace}``                                                                   |
+        +------------------+------------------------------------------------------------------------------------------+
|        | *Description*    | Root directory for HDFS files written by CDAP                                            |
+--------+------------------+------------------------------------------------------------------------------------------+
| ``hdfs.user``                                                                                                        |
+--------+------------------+------------------------------------------------------------------------------------------+
|        | *Default Value*  | ``yarn``                                                                                 |
+        +------------------+------------------------------------------------------------------------------------------+
|        | *Description*    | User name for accessing HDFS                                                             |
+--------+------------------+------------------------------------------------------------------------------------------+
| ``instance.name``                                                                                                    |
+--------+------------------+------------------------------------------------------------------------------------------+
|        | *Default Value*  | ``${root.namespace}``                                                                    |
+        +------------------+------------------------------------------------------------------------------------------+
|        | *Description*    | Determines a unique identifier for a CDAP instance. It is used for providing             |
|        |                  | authorization to a particular CDAP instance. Must be alphanumeric, and should not be     |
|        |                  | changed after CDAP has been started. If it is changed, there is a risk of losing data    |
|        |                  | (for example, authorization policies).                                                   |
+--------+------------------+------------------------------------------------------------------------------------------+

..


..

Regular table

.. list-table::
   :widths: 30 35 35
   :header-rows: 1

   * - Parameter Name
     - Default Value
     - Description
   * - ``hdfs.lib.dir``
     - ``${hdfs.namespace}/lib``
     - Common directory in HDFS for, among others, JAR files for coprocessors
   * - ``hdfs.namespace``
     - ``/${root.namespace}``
     - Root directory for HDFS files written by CDAP
   * - ``hdfs.user``
     - ``yarn``
     - User name for accessing HDFS
   * - ``instance.name``
     - ``${root.namespace}``
     - Determines a unique identifier for a CDAP instance. It is used for providing authorization to a particular CDAP instance. Must be alphanumeric, and should not be changed after CDAP has been started. If it is changed, there is a risk of losing data (for example, authorization policies).
   * - ``cluster.name``
     - 
     - A cluster-based name for CDAP. It is used for scope resolution of preferences and runtime arguments. For example: the preference key "cluster.[cluster.name].my.key" would be resolved to "my.key" at runtime; a program can then retrieve the preference value by using just "my.key". The administrator can use this property to set different preferences for each cluster.
   * - ``local.data.dir``
     - ``data``
     - Data directory for Standalone CDAP and the CDAP Master process in Distributed CDAP
   * - ``mapreduce.include.custom.format.classes``
     - ``true``
     - Indicates whether to include custom input/output format classes in the job.jar or not; if set to true, custom format classes will be added to the job.jar and available as part of the MapReduce system classpath
   * - ``mapreduce.jobclient.connect.max.retries``
     - ``2``
     - Indicates the maximum number of retries the JobClient will make to establish a service connection when retrieving job status and history
   * - ``master.manage.hbase.coprocessors``
     - ``true``
     - Whether CDAP Master should manage HBase coprocessors. This should only be set to false if you are managing coprocessors yourself in order to support rolling HBase upgrades.
   * - ``master.startup.checks.classes``
     - 
     - Comma-separated list of classnames for checks that will be run before the CDAP Master starts up. If any of the checks fails, the CDAP Master will not start up. Checks will only be run if ``${master.startup.checks.enabled}`` is set to true.
   * - ``master.startup.checks.enabled``
     - ``true``
     - Whether checks should be run before startup to determine if the CDAP Master can be run correctly. Which checks are run is determined by the ``${master.startup.checks.packages}`` and ``${master.startup.checks.classes}`` settings. If any checks fail, the CDAP Master will fail to start instead of waiting for the problem to be fixed. This setting only affects Distributed CDAP. It does not apply to Standalone CDAP.
   * - ``master.startup.checks.packages``
     - | ``co.cask.cdap.master.startup,co.cask.``
       | ``cdap.data.startup``
     - Comma-separated list of packages containing checks that will be run before the CDAP Master starts up. If any of the checks fails, the CDAP Master will not start up. Checks will only be run if ``${master.startup.checks.enabled}`` is set to true.
   * - ``namespaces.dir``
     - ``namespaces``
     - The sub-directory of ``${hdfs.namespace}`` in which namespaces are stored
   * - ``root.namespace``
     - ``cdap``
     - Root for this CDAP instance; used as the parent (or root) node for ZooKeeper, as the directory under which all CDAP data and metadata is stored in HDFS, and as the prefix for all HBase tables created by CDAP; must be composed of alphanumeric characters
   * - ``thrift.max.read.buffer``
     - ``16777216``
     - Specifies the maximum read buffer size in bytes used by the Thrift service; value should be set to greater than the maximum frame sent on the RPC channel
   * - ``twill.java.reserved.memory.mb``
     - ``250``
     - Reserved non-heap memory in megabytes for Apache Twill container
   * - ``twill.location.cache.dir``
     - ``.cache``
     - The relative directory name on the distributed file system for Apache Twill to cache generated files, to speed up launching applications. This directory is relative to ``${root.namespace}/twill`` on the file system.
   * - ``twill.jvm.gc.opts``
     - | ``-verbose:gc``
       | ``-Xloggc:&lt;LOG_DIR&gt;/gc.log``
       | ``-XX:+PrintGCDetails``
       | ``-XX:+PrintGCTimeStamps``
       | ``-XX:+UseGCLogFileRotation``
       | ``-XX:NumberOfGCLogFiles=10``
       | ``-XX:GCLogFileSize=1M``
     - Java garbage collection options for all Apache Twill containers; "&lt;LOG_DIR&gt;" is the location of the log directory in the container; note that the special characters are replaced with entity equivalents so they can be included in the XML
   * - ``twill.no.container.timeout``
     - ``120000``
     - Duration in milliseconds to wait for at least one container for Apache Twill runnable
   * - ``twill.zookeeper.namespace``
     - ``/twill``
     - ZooKeeper namespace prefix for Apache Twill
   * - ``zookeeper.client.startup.timeout.millis``
     - ``60000``
     - Duration in milliseconds to wait for a successful connection to a server in the ZooKeeper quorum
   * - ``zookeeper.quorum``
     - ``127.0.0.1:2181/${root.namespace}``
     - ZooKeeper quorum string; specifies the ZooKeeper host:port; substitute the quorum (FQDN1:2181,FQDN2:2181,...) for the components shown here
   * - ``zookeeper.session.timeout.millis``
     - ``40000``
     - ZooKeeper session timeout in milliseconds


..

1/2 width for the first column, longest third.

+---------------------------+------------------------------------------------------------------------------------------+
| Property Name             | Default Value, Description                                                               |
+===========================+==========================================================================================+
| ``hdfs.lib.dir``          | ``${hdfs.namespace}/lib``                                                                |
+                           +------------------------------------------------------------------------------------------+
|                           | Common directory in HDFS for, among others, JAR files for coprocessors                   |
+---------------------------+------------------------------------------------------------------------------------------+
| ``hdfs.namespace``        | ``/${root.namespace}``                                                                   |
+                           +------------------------------------------------------------------------------------------+
|                           | Root directory for HDFS files written by CDAP                                            |
+---------------------------+------------------------------------------------------------------------------------------+
| ``hdfs.user``             | ``yarn``                                                                                 |
+                           +------------------------------------------------------------------------------------------+
|                           | User name for accessing HDFS                                                             |
+---------------------------+------------------------------------------------------------------------------------------+
| ``instance.name``         | ``${root.namespace}``                                                                    |
+                           +------------------------------------------------------------------------------------------+
|                           | Determines a unique identifier for a CDAP instance. It is used for providing             |
|                           | authorization to a particular CDAP instance. Must be alphanumeric, and should not be     |
|                           | changed after CDAP has been started. If it is changed, there is a risk of losing data    |
|                           | (for example, authorization policies).                                                   |
+---------------------------+------------------------------------------------------------------------------------------+
| ``zookeeper.client.startup.timeout.millis``                                                                          |
+---------------------------+------------------------------------------------------------------------------------------+
|                           | ``60000``                                                                                |
+                           +------------------------------------------------------------------------------------------+
|                           | Duration in milliseconds to wait for a successful connection to a server in the          |
|                           | ZooKeeper quorum                                                                         |
+---------------------------+------------------------------------------------------------------------------------------+






