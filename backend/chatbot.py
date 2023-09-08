import openai
import data_handler as data
import time

openai.api_key = "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"

count_of_func_call = 0


def get_completion_from_messages(messages, model="gpt-3.5-turbo", temperature=0):
    global count_of_func_call
    resp = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature,  # this is the degree of randomness of the model's output
    )
    if count_of_func_call == 0:
        context.append({'role': 'assistant', 'content': resp.choices[0].message["content"]})
        count_of_func_call += 1
        return resp.choices[0].message["content"]
    #     print(str(response.choices[0].message))
    return resp.choices[0].message["content"]


# resume = read_docx_file("C:/Users/anavi/PycharmProjects/pythonProject/Test Files/Vikram R Modiyam.docx")
# resume = """{"resume_data": {
#     "Vikram Reddy Modiyam": {
#       "FirstName": "Vikram",
#       "MiddleName": "Reddy",
#       "LastName": "Modiyam",
#       "Email": "modiyam.vikram@gmail.com",
#       "CountryCode": "+1",
#       "Contact": "4709392933",
#       "ProfessionalSummary": "Around 4 years of experience across different areas like Customer Error detecting in Abinitio Control Center (ETL Tool), Splunk, developing Unix Scripts to save time and manual efforts, Change Management, Incident Management, SR Ticket Management, and Problem Management, AWS S3 Storage. Experience with monitoring/alerting/logging solutions (Splunk, Abinitio Control Center). Health Dashboard Monitoring for the processes in Appian Suite. Having a good knowledge on building Enterprise applications using “Appian BPM Suite” & SQL (MariaDB/AWS). Worked on building Multiple Process Models based on Business requirements to fulfil the user needs based on multiple group approvals using “Low Code Platform.” Exposure to all stages of Software Development Life Cycle (SDLC). Experience in incident management tools like Service Now and MyService. Assisting with the handling of major Incidents and identifying the root causes. Preventing the replication of Problems across multiple systems. Received the SPOT Award from CBA PROJECT MANAGEMENT for fixing the errors which are critical to the client reports. Taking part in Daily status call to update the Clients and team about the progress of ongoing and future releases. Developing Python & UNIX Shell scripts to reduce manual effort. Automating the manual activities to reduce the human intervention using Unix Scripting. Deployed developed Scripts in to a crontab/Abinitio Jobs for scheduling. Knowledge on migrating Unix servers to AWS Cloud servers.  Transferring Server files to AWS S3 Cloud Storage. Maintaining the application related websites from web servers. Managing the Abinitio Deployments through Unix scripts. Actively taking the manual tasks and automating it using shell scripting, which are available in the manual task’s confluence page for a long time. Actively involved in assisting Teams technical and Functional knowledge improving training activities. ",
#       "TechnicalSkills": {
#         "Applications": "Abinitio - Control Center, eclipse, Notepad ++, Jupyter, Tomcat,Oracle SQL Developer, MS SQL Server Management Studio, MobaXterm, Putty, Appian BPM 22.X, Selenium, GitHub, PostmanAPI, Splunk, Eclipse, Cucumber, TestNG, BDD framework, Jenkins.",
#         "Reporting Applications": "Confluence, Jira, Splunk, MyService, Service Now",
#         "Languages": "JSON, HTML, CSS, Java, Python, SQL, Unix Scripting",
#         "Database": "MS SQL, Oracle, AWS RDS",
#         "Operating Systems": "MS Windows, UNIX"
#       },
#       "Education": "Graduation: B.E – Electrical and Electronics Engineering from SATHYABAMA UNIVERSITY, INDIA in 2019.",
#       "Certifications": "Certified in Java, Python & Automation Testing from ABC Technologies, Bangalore, India. Earned Microsoft Certified Badge for intro to Python. Certified as Appian (BPM Tool) Associate Developer.",
#       "Achievements": "Developed Python & UNIX Shell scripts to reduce manual effort and deploying as Unix cronjob or scheduling as Abinitio job. Developed Python Web Application using “flask framework” for monitoring the daily file arrivals. Built a personal project BSR (Backup Storage Request) Application using Appian community.",
#       "WorkExperience": [
#         {
#           "CompanyName": "Infer Solutions Inc.",
#           "Position": "Software Engineer",
#           "ProjectName": "",
#           "StartDate": "January 2023",
#           "EndDate": "Present",
#           "Responsibilities": "Maintained technical documentation such as requirements, design reviews and test reports. Using Decision Objects to assign the task based on request type or category.  Implemented procedures for designing and development of all software applications in coordination with engineering teams. Facilitated daily stand-up meetings, sprint planning, and sprint retrospectives. Conducted detailed review and analysis of program specifications and designing as per work process changes. Establish and implement metrics to optimize team delivery and measure business agility in terms of predictability, reliability, and adaptability. Executed processes for analysis, designing and development of scalable solutions to meet customer requirements. Build test scripts for continuous smoke testing after each release. Prepared detailed and accurate technical documentation relating to Appian designs and reports. Provided technical assistance for troubleshooting and resolution of workflow system problems. Worked as a QA Automation Tester if they raised any defects for the user stories developed and fixed those defects and pushed for UAT. Worked on End-to-End Application, Regression Testing, Functional testing, Smoke Testing based on the scenario and Client requirements."
#         },
#         {
#           "CompanyName": "American Express",
#           "Position": "Java Production Engineer",
#           "ProjectName": "Digital Banking",
#           "StartDate": "September 2022",
#           "EndDate": "January 2023",
#           "Responsibilities": "Team management from onsite and offshore. Incident, problem, and change management process to make team follow the guidelines. Cross track co-ordination and P1/P2 Support. Application System Monitoring, Performance monitoring, DB Monitoring and acknowledge escalations within defined SLA. File transfer availability check using MS SQL Server DB. Automated the manual monitoring using Python and Flask. Experience in web-based Application monitoring tools and reporting. Providing Quick solutions for critical service and high business impact incidents. Troubleshoot, diagnose, and escalate customer issues as needed. Checking for errors on the Splunk logs and if it is known Java exception then doing the workaround based on the error. Scheduling alerts and creating Dashboards using Splunk. Working with L3 Support team for bug fixing. Monitor and assign backlogs incidents to team level2 and level3. Support and debug SaaS Subscriptions (Initial, Change, Renewal, cancel) Managing/Tracking ticketing system for incidents, Problem, and change management. Strictly following ITIL standards for incident and problem management and adhere to the entire team."
#         },
#         {
#           "CompanyName": "Tata Consultancy Services",
#           "Position": "Associate System Engineer",
#           "ProjectName": "CBA",
#           "StartDate": "February 2020",
#           "EndDate": "September 2022",
#           "Responsibilities": "Monitor the Abinitio Batch flow processing and ensure timely completion of file creation or data load into each table to get the reports ready. Follow all SOPs to provide first tier support and error resolution for all hardware and software on our highly automated laboratory production line in a timely manner and with necessary degree of quality independently. Complete training and competency assessments are required. Managing the team for completing the activities and Abinitio Control Center batches within the specified SLA. Monitor and assign backlogs incidents to team level2 and level3. Automating the Manual Work using Unix and Python Scripting. Attending escalations call backs from Level1 Team leads. Assisting with the handling of major Incidents and identifying the root causes. Preventing the replication of Problems across multiple systems. Monitoring progress on the resolution of Known Errors. Application SME from migrating the archive data from physical server to AWS S3 Cloud Storage. Worked on creating Unix scripts for file management migration scripts from physical server to AWS S3 Cloud Storage. Automation for the frequent failures in Abinitio Control Center batches. Taking part in Daily status call to update the Clients and team about the progress of ongoing and future releases. Scheduling meetings for reviewing and testing the scripts that I have developed. Installation/Upgradation and configurations like Java and Oracle software’s in Unix/Windows Servers. Maintenance of Abinitio Products like ExpressIT, Control Center, Mhub. User Keys and Service license management. Strong Knowledge of code deployment process. Work closely with server support teams for problem identification and implementation of changes to hardware, software, applications, or network systems. Developed UNIX Shell scripts to reduce manual effort. Worked on Developing an Abinitio Control Center Jobs to reduce manual work."
#         }
#       ]
#     }
#   }
# }"""

resume = ""


# def load_resu(key):
#     global resume
#     resume = data.read_json_with_id(key)


# print(resume)

"""Title: Software Engineer with Abinitio and Appian Experience
Description: Experienced software engineer skilled in Abinitio, Appian, and Python scripting."""

context = ""

response = ""


def complete_context(resume):
    global context
    context = [{'role': 'system', 'content': f"""
    You are a professional chatbot, \
    who can get the answers from the resume mentioned between backticks to the questions given by user. \ 
    provide the response based on the information provided in the backticks, \
    Provide the response only for the given information, \
    don't add any extra messages to the response. \
    Here is the candidate resume information ```{resume}```
    """}]


def recursive(a, key):
    global response
    global resume
    resume = data.read_json_with_id(key)
    complete_context((resume))
    # print(resume)
    context.append({'role': 'user', 'content': f"{a}"})
    # print(context)
    count_rec = 0
    try:
        response = get_completion_from_messages(context, temperature=1)
    except openai.error.RateLimitError:
        time.sleep(20)
        count_rec += 1
        if count_rec == 3:
            return {
                "User": a,
                "Assistant": "Server Error, Status: 500"
            }
        recursive(a, key)
    context.append({'role': 'assistant', 'content': f"{response}"})
    return {
        "User": a,
        "Assistant": response
    }

#
# while True:
#     # print(get_completion_from_messages(context))
#     print(recursive(a=input("chat here: "), key="modiyam.vikram@gmail.com")["Assistant"])
