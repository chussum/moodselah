#!/bin/bash

NEW_DIR="build-current"

yarn install
node scripts/build.js

if [ -d $NEW_DIR ]
then
  OLD_DATE=`date -r $NEW_DIR +%Y%m%d%H%M%S`
  OLD_DIR="build-$OLD_DATE"
  if [ ! -d $OLD_DIR ]
  then 
    mkdir $OLD_DIR
  else
    rm -rf $OLD_DIR
  fi
  mv $NEW_DIR $OLD_DIR
fi

mv build $NEW_DIR
