Feature: Multilingual Support

  Scenario: User selects a different language
    Given the user is on the homepage
    When the user selects "Español" from the language dropdown
    Then the website content should be displayed in Spanish

