import requests
import json
import random

# Replace with your Apollo Master API Key
API_KEY = "GeoN61-rt520Nrd3dwF3HA"
BASE_URL = "https://api.apollo.io/api/v1"

def search_people(titles, locations, industry=None):
    """
    Search for people in Apollo based on titles and locations.
    Uses a random page to ensure fresh leads each time.
    """
    url = f"{BASE_URL}/mixed_people/api_search"
    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY
    }
    
    # Pick a random page between 1 and 20 to find new leads
    random_page = random.randint(1, 20)
    
    payload = {
        "person_titles": titles,
        "person_locations": locations,
        "page": random_page,
        "per_page": 25,
        "contact_email_status": ["verified"]
    }
    if industry:
        payload["organization_industries"] = [industry]

    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json().get('people', [])
    else:
        print(f"Error searching people: {response.status_code} - {response.text}")
        return []

def create_contact(person_id):
    """
    Convert a person from the Apollo database into a contact in your CRM.
    Ensures the email is revealed so they can be added to sequences.
    """
    url = f"{BASE_URL}/contacts"
    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY
    }
    payload = {
        "person_id": person_id,
        "reveal_email": True # This uses a credit to get the email!
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        return response.json().get('contact', {}).get('id')
    else:
        print(f"Error creating contact: {response.status_code} - {response.text}")
        return None

def add_to_sequence(sequence_id, contact_ids, email_account_id):
    """
    Add a list of contact IDs to a specific sequence.
    """
    url = f"{BASE_URL}/emailer_campaigns/{sequence_id}/add_contact_ids"
    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY
    }
    payload = {
        "contact_ids": contact_ids,
        "emailer_campaign_id": sequence_id,
        "send_email_from_email_account_id": email_account_id
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        res_json = response.json()
        added_count = len(res_json.get('contacts', []))
        skipped = res_json.get('skipped_contact_ids', {})
        
        print(f"--- Results for Sequence {sequence_id} ---")
        print(f"Successfully Added: {added_count}")
        if skipped:
            print(f"Skipped {len(skipped)} contacts. Reasons: {list(set(skipped.values()))}")
        
        return res_json
    else:
        print(f"Error adding to sequence: {response.status_code} - {response.text}")
        return None

def get_email_accounts():
    """
    Fetch the list of connected email accounts to find the correct IDs.
    """
    url = f"{BASE_URL}/email_accounts"
    headers = {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json().get('email_accounts', [])
    else:
        print(f"Error fetching email accounts: {response.status_code} - {response.text}")
        return []

if __name__ == "__main__":
    # Fetch all connected email accounts from Apollo
    print("Fetching connected email accounts...")
    accounts = get_email_accounts()
    EMAIL_ACCOUNT_IDS = [acc.get('id') for acc in accounts if acc.get('active')]
    
    if not EMAIL_ACCOUNT_IDS:
        print("No active email accounts found in Apollo. Please connect your Instantly emails to Apollo first.")
    else:
        print(f"Found {len(EMAIL_ACCOUNT_IDS)} active email accounts.")

        # Target Personas with specific sequence mapping
        PERSONAS = [
            {
                "name": "NCAA/College",
                "titles": ["Recruiting Coordinator", "Assistant Coach", "Director of Player Personnel"],
                "locations": ["United States"],
                "sequence_id": "697ee6f5c25991001dfa9473"
            },
            {
                "name": "Prep Schools",
                "titles": ["Head Basketball Coach", "Athletic Director", "Head Coach"],
                "locations": ["United States"],
                "sequence_id": "697f8e47570fa4002051b22f"
            },
            {
                "name": "International Scouts",
                "titles": ["International Scout", "Director of Scouting", "NBA Scout"],
                "locations": ["Europe", "United States"],
                "sequence_id": "697f8e3658117a001d64edda"
            },
            {
                "name": "AAU/High School",
                "titles": ["AAU Coach", "Varsity Basketball Coach", "Head Coach"],
                "locations": ["United States"],
                "sequence_id": "697f8e5a705c000019f3c2eb"
            }
        ]
        
        for persona in PERSONAS:
            print(f"\n--- Targeting {persona['name']} ---")
            leads = search_people(persona['titles'], persona['locations'])
            
            contact_ids = []
            for lead in leads:
                name = (lead.get('name') or 
                        f"{lead.get('first_name', '')} {lead.get('last_name', '')}".strip() or 
                        "Unknown Name")
                title = lead.get('title')
                org = lead.get('organization', {}).get('name') if lead.get('organization') else lead.get('organization_name')
                print(f"Found: {name} - {title} at {org}")
                
                contact_id = create_contact(lead.get('id'))
                if contact_id:
                    contact_ids.append(contact_id)
            
            if contact_ids:
                # Randomly pick one of your connected emails to send from (Rotates your 9 emails)
                selected_email_id = random.choice(EMAIL_ACCOUNT_IDS)
                add_to_sequence(persona['sequence_id'], contact_ids, selected_email_id)
