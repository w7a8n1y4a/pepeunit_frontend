.PHONY: help install run-dev run-build run-preview lint style-lint gen-schema clean

help:
	@echo "Pepeunit Frontend - Commands:"
	@echo ""
	@echo "install:          Install main project dependencies"
	@echo "run-dev:          Run dev mod"
	@echo "run-build:        Run build app"
	@echo "run-preview:      Run preview over build"
	@echo "lint:             Linter run"
	@echo "style-lint:       Style Linter run"
	@echo "gen-schema:       Run GQL schema generation"
	@echo "clean:            Clean node_modules and dist"

install:
	@echo "Install all dependencies"
	npm install

run-dev:
	@echo "Run dev mod"
	npm run dev

run-build:
	@echo "Run build app"
	npm run build

run-preview:
	@echo "Run preview over build"
	npm run preview

lint:
	@echo "Linter run: eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
	npm run lint

style-lint:
	@echo "Style Linter run: stylelint ./src/**/*.{ts,tsx} --fix --config=./stylelint.config.cjs"
	npm run stylelint

gen-schema:
	@echo "Run GQL schema generation, for query and mutation..."
	npm run generate-api-types

clean:
	@echo "Clean node_modules and dist..."
	rm -rf node_modules dist
