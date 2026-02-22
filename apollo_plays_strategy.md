# Meta Africa Sports - Apollo.io "Plays" Strategy

To succeed with Apollo, you shouldn't just do one-off searches. You need to set up **"Plays"** (automations) that work while you sleep. Here are the three most effective Plays for Meta Africa Sports:

## Play 1: The "New Hire" Trigger
**Objective:** Catch new coaches as they join a program and are looking to make an impact with new recruits.

*   **Trigger:** Person Property Change -> `Title` or `Company`.
*   **Filters:** 
    *   Title includes: `Assistant Coach`, `Recruiting Coordinator`.
    *   Industry: `Higher Education`.
*   **Action:** 
    1.  Add to List: `New Coaching Hires`.
    2.  Add to Sequence: `NCAA - New Hire Welcome`.
*   **Messaging Angle:** "Congrats on the new role at [University]! As you look to build out your first recruiting class, I wanted to share a unique pipeline for international talent..."

## Play 2: The "Website Visitor" Intent
**Objective:** Identify which schools are already looking at your landing page.

*   **Trigger:** Website Visitor (requires Apollo tracking pixel on your site).
*   **Filters:** 
    *   Company is a `University` or `Sports Academy`.
    *   Visitor spent >30 seconds on the `Scouting Reports` page.
*   **Action:** 
    1.  Find People at that Company with titles: `Head Coach`, `Recruiting Coordinator`.
    2.  Add to Sequence: `Warm Lead - Website Visitor Follow-up`.
*   **Messaging Angle:** "I noticed someone from the [University] athletic department was checking out our African prospect database. I’d love to walk you through our top-ranked players for your specific needs."

## Play 3: The "Funding/Growth" Signal
**Objective:** Target pro teams or academies that just received investment or are expanding.

*   **Trigger:** Company Property Change -> `Funding Round` or `Hiring Surge`.
*   **Filters:** 
    *   Keywords: `Basketball Academy`, `Sports Management`, `Pro Basketball`.
*   **Action:** 
    1.  Add to List: `Expanding Sports Orgs`.
    2.  Add to Sequence: `Partnership - Growth Opportunity`.
*   **Messaging Angle:** "Saw the news about [Company]'s expansion. As you scale your talent identification, Meta Africa Sports can provide the verified data you need to minimize risk in the African market."

---

### How to implement:
1.  Go to the **"Plays"** tab in Apollo.
2.  Click **"Create New Play"**.
3.  Use the logic above to set your Triggers and Actions.
4.  **Crucial:** Ensure your "Sequences" are already written and active before turning on the Play.
