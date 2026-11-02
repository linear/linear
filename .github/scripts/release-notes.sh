#!/usr/bin/env bash
# Prints one version's section of a package's CHANGELOG.md, for example: release-notes.sh sdk 101.0.0
set -euo pipefail

package=$1
version=$2
awk -v heading="## $version" '/^## / { found = ($0 == heading); next } found' "packages/$package/CHANGELOG.md"
