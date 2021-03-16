<?php

$file = 'details-with-all-fields.xml';

// If file exists
if (file_exists($file)) {
	// Load XML file into an object
	$xml = simplexml_load_file($file);
	/*
	Now translate it to an JSON string and
	assign the JSON string to $json
	*/
	$json = json_encode($xml);

	// Output JSON
	//print_r($json);

  $myfile = fopen("newfile.json", "w") or die ('Unable to open newfile.json');
  fwrite($myfile, $json);

  fclose($myfile);
}
else {
    exit('Unable to open XML File');
}

?>
