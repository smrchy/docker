FROM nodesource/trusty:0.10.38

MAINTAINER Patrick Liess <smrchy@gmail.com>

RUN apt-get update \
	&& apt-get -y upgrade \
	&& apt-get -y install wget fontconfig libfontconfig1 libfreetype6 libjpeg-turbo8 libx11-6 libxext6 libxrender1 xfonts-base xfonts-75dpi \
	&& cd /tmp \
	&& wget http://downloads.sourceforge.net/wkhtmltopdf/wkhtmltox-0.12.2.1_linux-trusty-amd64.deb \
	&& dpkg -i wkhtmltox-0.12.2.1_linux-trusty-amd64.deb \
	&& apt-get -f -y install \
	&& mkdir /var/www \
	&& chmod 777 /var/www \
	&& mkdir /var/www/wmhtmlserver \
	&& rm wkhtmltox-0.12.2.1_linux-trusty-amd64.deb \
	&& apt-get clean
