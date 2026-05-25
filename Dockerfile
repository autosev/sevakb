FROM nginx:alpine

# Копируем статику в директорию Nginx
COPY . /usr/share/nginx/html/

# Удаляем дефолтную страницу
RUN rm -f /usr/share/nginx/html/index.html.bak

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
