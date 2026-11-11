#!/usr/bin/env bash
# Prints one version's section of a package's CHANGELOG.md, for example: release-notes.sh sdk 101.0.0
# GitHub rejects release bodies over 125,000 characters, and large schema updates can exceed that. Longer sections are
# cut at a line under max_bytes and end with a link to the full section. Bytes are never fewer than characters.
set -euo pipefail

package=$1
version=$2
changelog="packages/$package/CHANGELOG.md"
max_bytes=120000
url="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:-linear/linear}/blob/${GITHUB_SHA:-master}/$changelog#${version//./}"

LC_ALL=C awk -v heading="## $version" -v max="$max_bytes" -v url="$url" '
  /^## / { if (found) exit; found = ($0 == heading); next }
  found {
    size += length($0) + 1
    if (size > max) { truncated = 1; exit }
    print
  }
  END { if (truncated) printf "\nRelease notes truncated. See the [full release notes](%s).\n", url }
' "$changelog"
