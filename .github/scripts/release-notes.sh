#!/usr/bin/env bash
# Prints one version's section of a package's CHANGELOG.md, for example: release-notes.sh sdk 101.0.0
# GitHub rejects release bodies over 125,000 characters, so longer sections are cut and link to the full section.
set -euo pipefail

package=$1
version=$2
changelog="packages/$package/CHANGELOG.md"
limit=120000

notes=$(awk -v heading="## $version" '/^## / { found = ($0 == heading); next } found' "$changelog")

if ((${#notes} > limit)); then
  url="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:-linear/linear}/blob/${GITHUB_SHA:-master}/$changelog#${version//./}"
  notes="${notes:0:limit}"
  notes="${notes%$'\n'*}

Release notes truncated. See the [full release notes]($url)."
fi

if [ -n "$notes" ]; then
  printf '%s\n' "$notes"
fi
