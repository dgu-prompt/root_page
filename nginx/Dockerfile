FROM nginx:1.21.3

RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d   
RUN mkdir static
COPY /static/ /static/