#!/bin/bash

EXTENSION=".minidapp"
NUMDAPPS=$(ls -l ${EXTENSION} 2>/dev/null | wc -l)

if [[ $NUMDAPPS -eq 0 ]]
then

	echo "No MiniDapps Here!" >&2
	exit 1

else

	CONF="minidapp.conf"
	ICONREGEX='\"icon\"\:'
	VERSIONREGEX='\"version\"\:'

	echo "{"

	COUNTER=0
	for DAPP in *.minidapp
	do
		#create unique dir for minidapp
		DIR=$(echo $DAPP | cut -d. -f1)
		unzip -q -o $DAPP -d $DIR

		# find conf
		CONF="${DIR}/${CONF}"

		#find icon
		ICONFIELD=$(grep "$ICONREGEX" "$DIR/$CONF")
		ICONENTRY=$(echo $ICONFIELD | cut -d\" -f4 | sed "s/^\.\///")
		ICON="${DIR}/${ICONENTRY}"

		#find version
		VERSIONFIELD=$(grep "$VERSIONREGEX" "$DIR/$CONF")
		VERSION=$(echo $VERSIONFIELD | cut -d\" -f4 | sed "s/^\.\///")

		#create minidapp entry
		MINIDAPP="${DIR}/${DIR}${VERSION}${EXTENSION}"

		#add the minidapp to the directory
		mv $DAPP ${MINIDAPP}

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
