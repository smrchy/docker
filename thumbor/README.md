# Docker Thumbor

Run Thumbor as a Docker container.

## Usage


### Unsafe mode


```
# Run Thumbor on port 8888 in unsafe mode.
# In unsafe mode URLs don't need to be signed so anybody
# might use your Thumbor service.

$ docker run -p 8888:8888 smrchy/thumbor

```

### Safe mode (with Security-Key)

See [Thumbor Wiki: Security](https://github.com/thumbor/thumbor/wiki/Security)

```
# Run Thumbor on port 8888 in safe mode.
# All URLs need to be signed.

$ docker run -p 8888:8888 -e SECURITY_KEY=yourSecurityKeyABC123 smrchy/thumbor

```

## Ubuntu Upstart script to start Thumbor on boot

```
description "Thumbor container"
author "smrchy"
start on filesystem and started docker
stop on runlevel [!2345]
respawn
script
  /usr/bin/docker run -p 8888:8888 -e SECURITY_KEY=abc123 smrchy/thumbor >> /tmp/thumbor.log 2>&1
end script
```