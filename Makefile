#Default calls
SASS = sass --no-cache
SCULPIN = sculpin generate
GIT = git

REPO_URL = git@github.com:adambrett/md-ipsum.com.git
DEPLOY_BRANCH = gh-pages

THEME_DIRECTORY = source/themes/adambrett/md-ipsum.com
CSS_DIRECTORY = ${THEME_DIRECTORY}/assets/css
SCSS_DIRECTORY = ${THEME_DIRECTORY}/assets/scss
SCSS_FILE = ${SCSS_DIRECTORY}/style.scss
CSS_FILE = ${CSS_DIRECTORY}/style.css

OUTPUT_PROD = output_prod
OUTPUT_DEV = output_dev

all: clean scss build deploy

scss:
	${SASS} --style compressed ${SCSS_FILE} ${CSS_FILE}

scss-pretty:
	${SASS} ${SCSS_FILE} ${CSS_FILE}

server:
	${SCULPIN} --watch --server

build:
	${SCULPIN} --env=prod

deploy:
	cd ${OUTPUT_PROD}; rm -rf _ipsums
	cd ${OUTPUT_PROD}; ${GIT} init
	cd ${OUTPUT_PROD}; ${GIT} remote add origin ${REPO_URL}
	cd ${OUTPUT_PROD}; ${GIT} checkout -b ${DEPLOY_BRANCH}
	cd ${OUTPUT_PROD}; ${GIT} add -A
	cd ${OUTPUT_PROD}; ${GIT} commit -m 'Deploy'
	cd ${OUTPUT_PROD}; ${GIT} push -f origin ${DEPLOY_BRANCH}
	rm -rf ${OUTPUT_PROD} ${OUTPUT_DEV}

clean:
	rm -rf ${OUTPUT_PROD} ${OUTPUT_DEV}
