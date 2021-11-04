#!/bin/bash -x
SKINS=( "default" "extend" "alumni" "crtp" "dghi" "divinity" "dku" "law" "nursing" "pratt" "samsi" )
# SKINS=( "default" )
SKIN_BASE="./src/morpheus-master/sass"
i=0;
while [ $i -lt ${#SKINS[*]} ]; do
    TMP= "mvn install 
    -Dsakai.skin.customization.file=${SKIN_BASE}/_duke-${SKINS[$i]}.scss
    -Dsakai.skin.customization.js.lib=duke.lib.js
    -Dsakai.skin.customization.js.main=duke.${SKINS[$i]}.js
    -Dsakai.skin.target=duke-${SKINS[$i]}"
    printf "\n$TMP\n"
    mvn install \
    -Dsakai.skin.customization.file=${SKIN_BASE}/_duke-${SKINS[$i]}.scss \
    -Dsakai.skin.customization.js.lib=duke.lib.js \
    -Dsakai.skin.customization.js.main=duke.${SKINS[$i]}.js \
    -Dsakai.skin.target=duke-${SKINS[$i]}
    i=$(( i + 1));
done
printf "\nmvn install sakai:deploy-exploded\n"
mvn install -Dmaven.test.skip=true -T 1C sakai:deploy-exploded

# desired output:
# mvn clean install -Dmaven.test.skip=true -T 1C \
# -Dsakai.skin.customization.file=./src/morpheus-master/sass/_duke-default.scss \
# -Dsakai.skin.customization.js.lib=duke.lib.js \
# -Dsakai.skin.customization.js.main=duke.default.js \
# -Dsakai.skin.target=duke-default \
# sakai:deploy-exploded