# Pepeunit Frontend

## [Документация](https://git.pepemoss.com/pepe/pepeunit/pepeunit.git) Pepeunit

## Внешние зависимости

1. Развёрнутый [Бэкенд](https://git.pepemoss.com/pepe/pepeunit/pepeunit_backend.git) Pepeunit
2. Корректные настройки

## Основные этапы развёртывания
1. `npm install` - установит пакеты
1. Создать файл `.env` по аналогии с файлом `.env-example`
1. `npm run dev` - запустит дев стенд

## Полезные команды
1. `npm run dev` - запустит дев стенд
1. `npm run build` - сбилдит статический фронтенд
1. `npm run preview` - запустит веб сервер на основе статического фронтенда
1. `npm run lint` - запустит `eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0`
1. `npm run stylelint` - запустит `stylelint ./src/**/*.{ts,tsx} --fix --config=./stylelint.config.cjs`
1. `npm run generate-api-types` - запустит генерацию типов для GraphQL схемы, в том числи и запросов, на основе находищихся в папке `./src/gql`
