#!/bin/bash
git clone --depth=1 $(printenv REPO_URL).git && cd $(printenv PAGE_PATH)
if [ -f README.md ]; then
  case $(head -n 1 README.md) in
    ---)
      echo @@ Frontmatter already exists!
      ;;
    *)
      echo @@ Insert frontmatter now
      echo --- > frontmatter
      echo path: /github/$(printenv PAGE_PATH) >> frontmatter
      echo --- >> frontmatter
      mv README.md body
      cat frontmatter body > README.md
      rm frontmatter body
      ;;
  esac
  cp README.md ../src/markdown/$(printenv PAGE_PATH).md
else
  echo README.md doesn\'t exist
fi
git add . && git commit -m 'Add frontmatter' && git push
cd .. && rm -rf $(printenv PAGE_PATH)

