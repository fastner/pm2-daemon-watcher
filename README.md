pm2-daemon-watcher
==================

pm2 daemon watcher is a little tool that waits until pm2 daemon exits
(whether it is a normal exit or it is killed by exception or by operating system).

It is helpful if your server has a daemon starting process that want a blocking
process and otherwise restarts process.
