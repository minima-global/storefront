#!/bin/bash

EXTENSION=".minidapp"
NUMDAPPS=$(ls -l *${EXTENSION} | wc -l)

if [[ $NUMDAPPS -eq 0 ]]
then

	echo "No MiniDapps Here!" >&2
	exit 1

else

	CONFFILE="minidapp.conf"
	ICONREGEX='\"icon\"\:'
	VERSIONREGEX='\"version\"\:'

	echo "{"

	COUNTER=0
	for DAPP in *.minidapp
	do

		#create unique dir for minidapp
		DIR=$(echo $DAPP | cut -d. -f1)
		unzip -q -o $DAPP -d $DIR

		# find conf file
		CONF=$(find $DIR -name $CONFFILE | sed "s/$DIR\///")

		#find icon
		ICONFIELD=$(grep "$ICONREGEX" "$DIR/$CONF")
		ICONENTRY=$(echo $ICONFIELD | cut -d\" -f4)
		ICONNAME=$(basename "$ICONENTRY")
		ICON=$(find $DIR -name $ICONNAME | head -1 | sed "s/$DIR\///")

		#find version
		VERSIONFIELD=$(grep "$VERSIONREGEX" "${DIR}/${CONF}")
		VERSION=$(echo $VERSIONFIELD | cut -d\" -f4 | sed "s/^\.\///")

		#create minidapp entry
		MINIDAPP="${DIR}${VERSION}${EXTENSION}"

		#add the minidapp to the directory
		mv $DAPP "${DIR}/${MINIDAPP}"

		# Output JSON
		echo "  \"$DIR\": {"
		echo "    \"miniDapp\": \"$MINIDAPP\","
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
	exit 0
fi
