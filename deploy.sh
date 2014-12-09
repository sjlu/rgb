#!/bin/bash
if [ -e "naught.pid" ]; then
  npm run "deploy $1"
else
  npm run "start $1"
fi