#!/bin/bash

CONF="minidapp.conf"
NUMDAPPS=$(ls -l *minidapp | wc -l)
COUNTER=0

echo "{"

for DAPP in *.minidapp
do
	#create unique dir for minidapp
	DIR=$(echo $DAPP | cut -d. -f1)
	unzip -q -o $DAPP -d $DIR && mv $DAPP $DIR

	# find conf and icon
	CONF="${DIR}/${CONF}"
	ICONREGEX='\"icon\"\:'
	ICONFIELD=$(grep "$ICONREGEX" "$DIR/$CONF")
	ICONENTRY=$(echo $ICONFIELD | cut -d\" -f4 | sed "s/^\.\///")
	ICON="${DIR}/${ICONENTRY}"

	# Output JSON
	echo "  \"$DIR\": {"
	echo "    \"miniDapp\": \"$DAPP\","
	echo "    \"icon\": \"$ICON\","
	echo "    \"conf\": \"$CONF\""

	let COUNTER=COUNTER+1

	if [ $COUNTER -eq $NUMDAPPS ]
	then
		echo "  }"
	else
		echo "  },"
	fi
done

echo "}"
