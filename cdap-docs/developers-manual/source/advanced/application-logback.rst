.. meta::
    :author: Cask Data, Inc.
    :copyright: Copyright © 2015-2017 Cask Data, Inc.

.. _application-logback:

===================
Application Logback
===================

.. highlight:: xml

YARN containers launched by a CDAP application use a default container logback file
|---| ``logback-container.xml`` |---| packaged with CDAP and installed in 
the CDAP :ref:`configuration directory <admin-manual-cdap-components>`. This logback does
log rotation once every day at midnight and deletes logs older than 14 days. Depending on
the use case, the default configuration may be sufficient.

However, you can specify a custom ``logback.xml`` for a CDAP application by packaging
it with the application in the application's ``src/main/resources`` directory.
The packaged ``logback.xml`` is then used for each container launched by the application.

To write a custom logback, refer to `Logback <http://logback.qos.ch/>`__ for information.

**Note:** When a custom ``logback.xml`` is specified for an application, the custom
``logback.xml`` will be used in place of the ``logback-container.xml``. A custom
``logback.xml`` needs to be configured for log rotation (``rollingPolicy``) and log
clean-up (``maxHistory``) to ensure that long-running containers don't fill up the disk.

Adding an new custom appender
=============================
CDAP's *Log Framework* allows you to implement custom logback appenders. 

CDAP comes packaged with the CDAP ``LogAppender`` class which is used by CDAP for
processing logs from the CDAP system and user namespaces. It also has a
``RollingLocationLogAppender``, an extension of `Logback <http://logback.qos.ch/>`__\ 's
``RollingFileAppender`` that uses HDFS.

More information implementing a custom appender can be found here <link>.
 
Once you have the appender packaged, copy the appender JAR to the path denoted by property
``log.process.pipeline.lib.dir`` in your cluster's ``cdap-site.xml`` file in order to make
it available. 

When the ``log.saver`` system container starts up, any JARs under that directory will be
made available to it.

Creating New Log Pipelines
--------------------------
In the CDAP log framework, for every ``logback.xml`` files configured in the
``log.process.pipeline.config.dir``, a logging pipeline is created for the file. A log
pipeline provides isolation from other log pipelines.

.. image:: /_images/log-pipelines.png
   :width: 5in
   :align: center

As indicated in the diagram above, each pipeline requires a unique name. This name is used
for persisting and retrieving of metadata (such as Kafka offsets).

They have separate Kafka consumers, as this allows each pipeline to have different offsets
and a slow processing pipeline won't affect the performance of faster logging pipelines.


Example Logging pipeline configuration used by CDAP system logging -
<https://github.com/caskdata/cdap/blob/release/4.1/cdap-watchdog/src/main/resources/cdap-
log-pipeline.xml>

Example Custom Logging pipeline configuration using RollingLocationLogAppender -
https://github.com/caskdata/cdap/blob/release/4.1/cdap-watchdog/src/test/resources/rolling
-appender-logback-test.xml 

TODO : find a better example for this.

To create a custom logging pipeline, you would create and configure a
``logback.xml`` file, configuring loggers and appenders based on your requirement and place
this logback file at the path identified by ``log.process.pipeline.config.dir``.


Pipeline Properties

CDAP Pipeline has certain common properties for the pipelines that can be configured in
cdap-site.xml. They are 

Properties
log.process.pipeline.buffer.size
log.process.pipeline.checkpoint.interval.ms
log.process.pipeline.event.delay.ms
log.process.pipeline.kafka.fetch.size
log.process.pipeline.logger.cache.size
log.process.pipeline.logger.cache.expiration.ms
log.process.pipeline.auto.buffer.ratio

Default Values for these can be found in cdap-default.xml. 

These properties can also be changed at pipeline level, by overriding these properties by
providing a value in the pipeline's logback.xml file for these properties.

Implementing a custom Appender

Users can use any existing logback's appender and also `RollingLocationLogAppender` -
Extension of RollingFileLogAppender to use HDFS location in their logging pipelines. In
addition, it is also possible for a user to implement their custom appender and make use
of it in the log framework.

LogFramework uses the logback's Appender API, So a user wishing to write a custom
appender, has to implement Logback's Appender interface in their application.

In Addition access to CDAP's system components like, Datasets, Metrics, LocationFactory,
etc. are made available to Appender Context.

https://github.com/caskdata/cdap/blob/release/4.1/cdap-watchdog-api/src/main/java/co/cask/
cdap/api/logging/AppenderContext.java

Adding Dependency on cdap-watch-dog API will allow you to access AppenderContext in your
application. AppenderContext is an extension of logback's LoggerContext.

Properties for adding new appenders and new log pipelines

Property
Description
default

log.process.pipeline.config.dir

A local directory on the CDAP Master that is scanned for log processing pipeline
configurations. Each pipeline is defined by a file in the logback XML format, with
".xml" as the file name extension.

/opt/cdap/master/ext/logging/config


log.process.pipeline.lib.dir

Semicolon-separated list of local directories on the CDAP Master scanned
for additional library JAR files to be included for log processing

/opt/cdap/master/ext/logging/lib




