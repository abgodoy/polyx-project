<?php
// grab the delimited file here (.csv, .tab)
$myfile = fopen("details-with-all-fields.txt", "r") or die ("Unable to open file");
//fread($myfile, filesize("details-with-all-fields.txt"));

$line = fgets($myfile);
$line = fgets($myfile);
$field_names = explode("\t", $line);

// populate the array
$count = 0;
while(!feof($myfile)) {
  $line = fgets($myfile);
  $data = explode("\t", $line);
  echo $count . ": " . $data[1] . "\n";
  $count++;
}

// close file
fclose($myfile);


// convert the array to JSON file, or XML
// json_encode




// Write data to a file and return the structured file to be uploaded to Cascade




?>
