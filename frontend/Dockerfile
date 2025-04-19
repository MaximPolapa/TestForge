FROM node:20

WORKDIR /app

COPY ./frontend /app

# Встановлюємо залежності + tailwind
RUN npm install
RUN npm install -D tailwindcss@3 postcss autoprefixer
RUN npx tailwindcss init -p

# Копіюємо Tailwind інструкції у CSS
RUN echo '@tailwind base;\n@tailwind components;\n@tailwind utilities;' > ./src/index.css

# Налаштовуємо Tailwind config
RUN sed -i 's|content: \[\]|content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]|' tailwind.config.js


RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
