import requests
import json

# Replace with your Apollo Master API Key
API_KEY = "GeoN61-rt520Nrd3dwF3HA"
BASE_URL = "https://api.apollo.io/api/v1"

def check_sequence(sequence_id):
    url = f"{BASE_URL}/emailer_campaigns/{sequence_id}"
    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json().get('emailer_campaign', {})
        print(f"Sequence: {data.get('name')}")
        print(f"Total Contacts: {data.get('num_contacts')}")
        return data
    else:
        print(f"Error: {response.status_code}")
        return None

def test_add_single_contact(sequence_id):
    # Search for a person first
    search_url = f"{BASE_URL}/mixed_people/api_search"
    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY
    }
    search_payload = {
        "person_titles": ["Coach"],
        "per_page": 1
    }
    search_res = requests.post(search_url, headers=headers, json=search_payload)
    person = search_res.json().get('people', [])[0]
    person_id = person.get('id')
    print(f"Found Person ID: {person_id}")

    # Create contact
    contact_url = f"{BASE_URL}/contacts"
    contact_payload = {"person_id": person_id}
    contact_res = requests.post(contact_url, headers=headers, json=contact_payload)
    contact_id = contact_res.json().get('contact', {}).get('id')
    print(f"Created Contact ID: {contact_id}")

    # Get email account
    email_url = f"{BASE_URL}/email_accounts"
    email_res = requests.get(email_url, headers=headers)
    email_id = email_res.json().get('email_accounts', [])[0].get('id')
    print(f"Using Email ID: {email_id}")

    # Add to sequence
    add_url = f"{BASE_URL}/emailer_campaigns/{sequence_id}/add_contact_ids"
    add_payload = {
        "contact_ids": [contact_id],
        "emailer_campaign_id": sequence_id,
        "send_email_from_email_account_id": email_id
    }
    add_res = requests.post(add_url, headers=headers, json=add_payload)
    print(f"Add to Sequence Status: {add_res.status_code}")
    print(f"Add to Sequence Response: {json.dumps(add_res.json(), indent=2)}")

if __name__ == "__main__":
    # Test with the AAU sequence
    sid = "697f8e5a705c000019f3c2eb"
    print(f"--- Debugging Sequence {sid} ---")
    test_add_single_contact(sid)
