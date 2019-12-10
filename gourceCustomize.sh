# Remove actions after a certain date (currently December SGX)
cat gourceLog.txt | awk -F\| '$1<=1576108800' > gourceLog.temp
sed -i.bak '/rexrainbow/d' ./gourceLog.temp
mv gourceLog.temp gourceLog.txt
rm gourceLog.temp.bak

# Setup Project Name
projName="Woolhelmina's Bedtime Roundup - Source Code"

function fix {
  sed -i -- "s/$1/$2/g" gourceLog.txt
}

# Replace non human readable names with proper ones
fix "|Aumann-Weyenberg|" "|Kendra Aumann-Weyenberg|"
fix "|Smith|" "|Abby Smith|"
