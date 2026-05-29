export

SHELL := /bin/bash -o errexit -o nounset -o pipefail

MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

VERBOSE ?= false
ifeq (${VERBOSE}, false)
	# --silent drops the need to prepend @
	MAKEFLAGS += --silent
endif

# Tools
HUGO := hugo

# Output
PUBLIC := public

.PHONY: all
all: build ## Build the site

.PHONY: run
run: ## Serve the site locally with live reload
	${HUGO} server --buildDrafts --disableFastRender

.PHONY: build
build: ## Build the production site into public/
	${HUGO} --minify --gc --printPathWarnings

.PHONY: clean
clean: ## Remove build artefacts
	rm -rf ${PUBLIC} resources .hugo_build.lock

.PHONY: help
help:
	awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*?##/ { printf "\033[36m%-20s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
