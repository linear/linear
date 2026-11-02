#!/usr/bin/env bash
# Prints the lines under a version's "## <version>" heading in a package's CHANGELOG.md, up to the next "## " heading.
# Usage: release-notes.sh <package directory under packages/> <version>
set -euo pipefail

package=$1
version=$2
awk -v heading="## $version" '/^## / { found = ($0 == heading); next } found' "packages/$package/CHANGELOG.md"
