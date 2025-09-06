import datetime
import json
import data_json

d = datetime.datetime.now()
date = d.strftime('%Y-%m-%d %H:%M:%S')

filename = "../database.json"
try:
    with open(filename, "r") as f:
        json_data = json.load(f)
except json.decoder.JSONDecodeError:
    # Handle the JSONDecodeError, e.g., by initializing json_data with a default value
    json_data = data_json.resume
except FileNotFoundError:
    # Handle the case where the file doesn't exist
    json_data = data_json.resume


# the below method is used to update the json file with the values taken from the local parameters
def write_json(json_data):
    with open(filename, "w") as f1:
        json.dump(json_data, f1, indent=4)


# the below method will return all the values of the available data
data = json_data["resume_data"]
user_data = json_data["Authentication"]


# check that the given ID is valid or not
def is_key_valid(key=None):
    if key not in data.keys() or len(data) == 0 or data[key] is None:
        return False
    else:
        return True


# the below method is used to get the details based on the given ID
def read_json_with_id(key=None):
    if len(data) != 0:
        if key is not None:
            return data[key]
        else:
            data_json.error["error"] = "Data is not available for the given key."
            return data_json.error
    else:
        return {
            "message": "No Data Available"
        }


# the below method is used to create the new record in the flask_details data
def write_new_record_to_json(body):
    key = body["Email"]
    body["lastUpdated"] = date
    data[key] = body
    # print(data)
    # print(json_data)
    write_json(json_data=json_data)
    return {
        "new added record": body,
        "message": "Record added successfully."
    }


# the below method is used to delete the record from the json file
def delete_record_from_json(key=None):
    if key is not None and is_key_valid(key):
        temp = data[key]
        # data[id] = None
        data.pop(key)
        write_json(json_data=json_data)
        return {
            "message": "Record Deleted Successfully",
            "Deleted Record": temp
        }
    else:
        data_json.error["error"] = "Key is not available to delete the record"
        return data_json.error


# the below method is used to update an existing record in the flask_details data
def update_new_record_to_json(body, key=None):
    if key is not None and is_key_valid(key):
        body["lastUpdated"] = date
        data[key] = body
        write_json(json_data=json_data)
        return {
            "new updated record": body,
            "message": "Record updated successfully."
        }
    else:
        data_json.error["error"] = "ID is not available to update the record"
        return data_json.error


# add user into json file
def add_users(body):
    # body = json.loads(body)
    user_data["Users"][body["email"]] = body
    write_json(json_data=json_data)
    return body


# get users
def read_users(key=None):
    if len(user_data) != 0:
        if key is not None:
            if key in user_data:
                return user_data[key]
            else:
                return {"error": "User not found"}
        else:
            data_json.error["error"] = "Data is not available for the given key."
            return data_json.error
    else:
        return {
            "message": "No Data Available"
        }


sample_data = {
    "FirstName": "Vikram",
    "MiddleName": "Reddy",
    "LastName": "Modiyam",
    "About": "I'm a Production Support Engineer with knowledge of multiple Technologies.",
    "Email": "modiyam.vikram@gmail.com",
    "CountryCode": "+1",
    "Contact": "4709392933",
    "ProfessionalSummary": "Around 4 years of experience across different areas like Customer Error detecting in Abinitio Control Center (ETL Tool), Splunk, developing Unix Scripts to save time and manual efforts, Change Management, Incident Management, SR Ticket Management, and Problem Management, AWS S3 Storage. Experience with monitoring/alerting/logging solutions (Splunk, Abinitio Control Center). Health Dashboard Monitoring for the processes in Appian Suite. Having a good knowledge on building Enterprise applications using \u201cAppian BPM Suite\u201d & SQL (MariaDB/AWS). Worked on building Multiple Process Models based on Business requirements to fulfil the user needs based on multiple group approvals using \u201cLow Code Platform.\u201d Exposure to all stages of Software Development Life Cycle (SDLC). Experience in incident management tools like Service Now and MyService. Assisting with the handling of major Incidents and identifying the root causes. Preventing the replication of Problems across multiple systems. Received the SPOT Award from CBA PROJECT MANAGEMENT for fixing the errors which are critical to the client reports. Taking part in Daily status call to update the Clients and team about the progress of ongoing and future releases. Developing Python & UNIX Shell scripts to reduce manual effort. Automating the manual activities to reduce the human intervention using Unix Scripting. Deployed developed Scripts in to a crontab/Abinitio Jobs for scheduling. Knowledge on migrating Unix servers to AWS Cloud servers.  Transferring Server files to AWS S3 Cloud Storage. Maintaining the application related websites from web servers. Managing the Abinitio Deployments through Unix scripts. Actively taking the manual tasks and automating it using shell scripting, which are available in the manual task\u2019s confluence page for a long time. Actively involved in assisting Teams technical and Functional knowledge improving training activities. ",
    "TechnicalSkills": {
        "Applications": "Abinitio - Control Center, eclipse, Notepad ++, Jupyter, Tomcat, Oracle SQL Developer, MS SQL Server Management Studio, MobaXterm, Putty, Appian BPM 22.X, Selenium, GitHub, PostmanAPI, Splunk, Eclipse, Cucumber, TestNG, BDD framework, Jenkins.",
        "Reporting Applications": "Confluence, Jira, Splunk, MyService, Service Now",
        "Languages": "JSON, HTML, CSS, Java, Python, SQL, Unix Scripting",
        "Database": "MS SQL, Oracle, AWS RDS",
        "Operating Systems": "MS Windows, UNIX"
    },
    "Education": "Graduation: B.E \u2013 Electrical and Electronics Engineering from SATHYABAMA UNIVERSITY, INDIA in 2019.",
    "Certifications": "Certified in Java, Python & Automation Testing from ABC Technologies, Bangalore, India. Earned Microsoft Certified Badge for intro to Python. Certified as Appian (BPM Tool) Associate Developer.",
    "Achievements": "Developed Python & UNIX Shell scripts to reduce manual effort and deploying as Unix cronjob or scheduling as Abinitio job. Developed Python Web Application using \u201cflask framework\u201d for monitoring the daily file arrivals. Built a personal project BSR (Backup Storage Request) Application using Appian community.",
    "WorkExperience": [
        {
            "CompanyName": "Infer Solutions Inc.",
            "Position": "Software Engineer",
            "ProjectName": "",
            "StartDate": "January 2023",
            "EndDate": "Present",
            "Responsibilities": "Maintained technical documentation such as requirements, design reviews and test reports. Using Decision Objects to assign the task based on request type or category.  Implemented procedures for designing and development of all software applications in coordination with engineering teams. Facilitated daily stand-up meetings, sprint planning, and sprint retrospectives. Conducted detailed review and analysis of program specifications and designing as per work process changes. Establish and implement metrics to optimize team delivery and measure business agility in terms of predictability, reliability, and adaptability. Executed processes for analysis, designing and development of scalable solutions to meet customer requirements. Build test scripts for continuous smoke testing after each release. Prepared detailed and accurate technical documentation relating to Appian designs and reports. Provided technical assistance for troubleshooting and resolution of workflow system problems. Worked as a QA Automation Tester if they raised any defects for the user stories developed and fixed those defects and pushed for UAT. Worked on End-to-End Application, Regression Testing, Functional testing, Smoke Testing based on the scenario and Client requirements.",
            "Technologies": "Appian, Selenium, AWS RDS, Unix, Java, eclipse, Appian BPM Suite, Confluence, Jira, My SQL, MariaDB"
        },
        {
            "CompanyName": "American Express",
            "Position": "Java Production Engineer",
            "ProjectName": "Digital Banking",
            "StartDate": "September 2022",
            "EndDate": "January 2023",
            "Responsibilities": "Team management from onsite and offshore. Incident, problem, and change management process to make team follow the guidelines. Cross track co-ordination and P1/P2 Support. Application System Monitoring, Performance monitoring, DB Monitoring and acknowledge escalations within defined SLA. File transfer availability check using MS SQL Server DB. Automated the manual monitoring using Python and Flask. Experience in web-based Application monitoring tools and reporting. Providing Quick solutions for critical service and high business impact incidents. Troubleshoot, diagnose, and escalate customer issues as needed. Checking for errors on the Splunk logs and if it is known Java exception then doing the workaround based on the error. Scheduling alerts and creating Dashboards using Splunk. Working with L3 Support team for bug fixing. Monitor and assign backlogs incidents to team level2 and level3. Support and debug SaaS Subscriptions (Initial, Change, Renewal, cancel) Managing/Tracking ticketing system for incidents, Problem, and change management. Strictly following ITIL standards for incident and problem management and adhere to the entire team.",
            "Technologies": "Unix, Java, eclipse, Intellij, Confluence, Jira, Service Now, Python, Flask, SQL, MS Access"
        },
        {
            "CompanyName": "Tata Consultancy Services",
            "Position": "Associate System Engineer",
            "ProjectName": "CBA",
            "StartDate": "February 2020",
            "EndDate": "September 2022",
            "Responsibilities": "Monitor the Abinitio Batch flow processing and ensure timely completion of file creation or data load into each table to get the reports ready. Follow all SOPs to provide first tier support and error resolution for all hardware and software on our highly automated laboratory production line in a timely manner and with necessary degree of quality independently. Complete training and competency assessments are required. Managing the team for completing the activities and Abinitio Control Center batches within the specified SLA. Monitor and assign backlogs incidents to team level2 and level3. Automating the Manual Work using Unix and Python Scripting. Attending escalations call backs from Level1 Team leads. Assisting with the handling of major Incidents and identifying the root causes. Preventing the replication of Problems across multiple systems. Monitoring progress on the resolution of Known Errors. Application SME from migrating the archive data from physical server to AWS S3 Cloud Storage. Worked on creating Unix scripts for file management migration scripts from physical server to AWS S3 Cloud Storage. Automation for the frequent failures in Abinitio Control Center batches. Taking part in Daily status call to update the Clients and team about the progress of ongoing and future releases. Scheduling meetings for reviewing and testing the scripts that I have developed. Installation/Upgradation and configurations like Java and Oracle software\u2019s in Unix/Windows Servers. Maintenance of Abinitio Products like ExpressIT, Control Center, Mhub. User Keys and Service license management. Strong Knowledge of code deployment process. Work closely with server support teams for problem identification and implementation of changes to hardware, software, applications, or network systems. Developed UNIX Shell scripts to reduce manual effort. Worked on Developing an Abinitio Control Center Jobs to reduce manual work.",
            "Technologies": "Unix, Confluence, Jira, Abinitio, Control Center, Unix Scripting, Splunk, MyService, Service Now, Servers(Windows, Unix), Tomcat, Oracle SQL Developer, MS SQL Server Management Studio, MobaXterm, Putty"
        }
    ],
    "lastUpdated": ""
}

# print(type(read_json_with_id("modiyam.vikram@gmail.com")))
# print(is_key_valid("modiyam.vikram@gmail.com"))
# print(write_new_record_to_json(sample_data))
# print(delete_record_from_json("modiyam.vikram@gmail.com"))
# print(update_new_record_to_json(sample_data, "modiyam.vikram@gmail.com"))

