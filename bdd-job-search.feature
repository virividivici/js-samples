@JobSearch
Feature: Careers Job Search
As a user I should be able to search jobs
based on a category

Scenario Outline: Job Search for Hospital Jobs
Given I go to "<Careers Home Page>" on "<Browser>"
When I Click on "Search jobs"
Then I should be able to see Search Popup
When I Choose the following :
|Category 		| Hospital Jobs		|
|Speciality		| Cardiology		|
|Region 		| London			|
|Grade	 		| Consultant		|
|Work Pattern	| Locum Full-Time	|
And I Click on Submit button
Then I should see "Email me jobs like these" button
And the Results per page should be defaulted to "10"
And the following links should be present and clickable:
|	Date posted 	| 
|	Closing date 	| 
|	Grade 			| 
|	Region 			| 
|	Work pattern 	|
And I should be able to click on the Pagination till the end of the job results
And I should be able to click and verify the first advert of every page.

Examples:
|	Browser	 	 |	Careers Home Page	|
|   Firefox	 	 | 	baseDomain			|



Scenario Outline: Job Search for General Medicine Jobs
Given I'm on "<Careers Home Page>" on "<Browser>"
When I Click on JobSearch
Then I should be able to see Search Popup
When I Choose the following :
|Category 			| General Medicine Jobs	|
|Classification 	| Medical Posts-General	|
|Region 			| London				|
|Work Pattern		| Locum Full-Time		|
And I Click on Submit button
Then I should see "Email me jobs like these" button
And the Results per page should be defaulted to "10"
And the following links should be present and clickable:
|	Date posted 	| 
|	Closing date 	| 
|	Grade 			| 
|	Region 			| 
|	Work pattern 	|
And I should be able to click on the Pagination till the end of the job results
And I should be able to click and verify the first advert of every page.

Examples:
|	Browser	 	 |	Careers Home Page	|
|   Firefox	 	 | 	baseDomain			|


Scenario Outline: Job Search for GP and PCT Jobs
Given I'm on "<Careers Home Page>" on "<Browser>"
When I Click on JobSearch
Then I should be able to see Search Popup
When I Choose the following :
|Category 			| GP and PCT Jobs 		|
|Classification 	| General Practice		|
|Region 			| London				|
|Work Pattern		| Locum Full-Time		|
And I Click on Submit button
Then I should see "Email me jobs like these" button
And the Results per page should be defaulted to "10"
And the following links should be present and clickable:
|	Date posted 	| 
|	Closing date 	| 
|	Grade 			| 
|	Region 			| 
|	Work pattern 	|
And I should be able to click on the Pagination till the end of the job results
And I should be able to click and verify the first advert of every page.

Examples:
|	Browser	 	|	Careers Home Page	|
|   Firefox	 	| 	baseDomain			|

Scenario Outline: Job Search Filtering conditions
Given I go to "<Careers Home Page>" on "<Browser>"
When I Click on JobSearch
Then I should be able to see Search Popup
When I Choose the Category as "Hospital Jobs"
And I Click on Submit button
Then I should land into Search Results page
When I Choose the Speciality as "Dermatology"
And Click on "Refresh Results"
Then I should see the Search Results based on speciality "Dermatology"
When I Choose the Region as "London"
And Click on "Refresh Results"
Then I should see the Search Results based on Region "London"
When I Choose the Grade as "Consultant"
And Click on "Refresh Results"
Then I should see the Search Results based on Grade "Consultant"
When I Choose the Work Pattern as "Substantive Full-Time"
And Click on "Refresh Results"
Then I should see the Search Results based on Work Pattern "Substantive Full-Time"
When I enter the Keyword "Dermatology"
And Click on "Refresh Results"
Then I should see the Search Results based on Keyword "Dermatology"
When I enter the Advert number "342701-0"
And Click on "Refresh Results"
Then I should see the Search Results based on Advert number "342701-0"
When I Click on Search Results
Then I should see "Related Article"
When I Click on the Related Article links one-by-one
Then all the pages names should match the Related Article name
And I should be able to see "Related adverts"
When I Click on any one of the Related Advert link(s)
Then the Related Advert Link should match the Page Name

Examples:
|	Browser	 	|	Careers Home Page	|
|   Firefox	 	| 	baseDomain			|














