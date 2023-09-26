import openai
import data_handler as data
import time
import os
import dotenv

# Load environment variables from a .env file
dotenv.load_dotenv()

openai.api_key = os.getenv("openai_api")

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

resume = ""


# def load_resu(key):
#     global resume
#     resume = data.read_json_with_id(key)


# print(resume)

"""Title: Software Engineer with Abinitio and Appian Experience
Description: Experienced software engineer skilled in Abinitio, Appian, and Python scripting."""

context = []

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
