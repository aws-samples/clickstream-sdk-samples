#!/bin/bash

find images -type d -name "* *" | while IFS= read -r dir; do
    echo "Processing directory: $dir"
    cd "$dir" || exit

    for file in *; do
        if [[ "$file" == *.jpg ]]; then
          break
        fi
        filename=$(basename "$file" .jpg)
        newname=$(echo "$filename" | sed 's/...$/.jpg/')
        mv "$file" "$newname"
    done
    cd ../../
done
