#!/bin/sh

psql -U $POSTGRES_USER -d $POSTGRES_DB -a -f ./dump.sql