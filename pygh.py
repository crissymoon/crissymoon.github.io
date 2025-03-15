
#Crissy Deutsch
#Python 3.13
#Start Date: 2-28-2025
#Beta Verion 1.0 @6:57PM 2-28-2025 - is talking to GitHub on all functions - no errors yet
#################################

import subprocess as sp
import webbrowser, time
import re, shutil, os, datetime

######################################################################
######################################################################
######################################################################
#########################FUNCTIONS####################################
def nl(): #next line
	print("\n")

def run_cmd(cmd_text):
	sp.run(cmd_text, shell=True, text=True)

def custom_command():
	i = input("\nEnter the command you wish to run: ")
	run_cmd(i)


def create_ssh():
	nl()
	print("If prompt is open in folder just click enter.\n\nLeave passphrase empty. Click enter twice.")
	nl()
	user_email = input("Please enter your email address: ")
	nl()
	run_cmd(f'ssh-keygen -t rsa -b 4096 -C "{user_email}"')

def open_git_to_keys():
	webbrowser.open("https://github.com/settings/ssh/new")


nl()
input("Press Enter To Initiate: CDZToolz - Simple Git Commands")

def push_to_gh():
	comment = input("Enter a comment: ")
	print("\n**INITIATE**\n")
	run_cmd("git init")
	s()
	print("\n**ADD FILES**\n")
	run_cmd("git add .")
	s()
	print("\n**COMMIT**")
	text = f'git commit -m "{comment}"'
	run_cmd(text)
	s()
	print("\n**BRANCH**\n")
	run_cmd("git branch -m main")
	s()
	print("\n**PUSH**\n")
	run_cmd("git push")
	s()
	print("\n**STATUS**\n")
	run_cmd("git status")

def clone():
	i = input("Enter url: ")
	print("\n**CLONE**\n")
	run_cmd("git clone " + i)

def pull():
	run_cmd("git pull")

def force_push():
	i = input("Enter url: ")
	print("\n**CLONE**\n")
	run_cmd("git clone " + i)
	s()
	print("\n**ADD FILES**\n")
	run_cmd("git add .")
	s()
	print("\n**COMMIT**\n")
	run_cmd('git commit -m "FORCE PUSH FROM PYGH"')
	s()
	print("**FORCE PUSH**")
	run_cmd("git push --force --all")

def fetch():
	print("\n**FETCH**\n")
	run_cmd("git fetch")

def merge():
	print("\n**MERGE**")
	run_cmd("git merge")

def fetch_merge():
	print("\n**FETCH**\n")
	run_cmd("git fetch")
	s()
	print("\n**MERGE**")
	run_cmd("git merge")


def s():
	time.sleep(0.3)

def create_backup():
	current_dir = os.getcwd()
	make_tstamp = re.sub(r'[^a-zA-Z0-9]', '', str(datetime.datetime.now()))
	create_folder_path = current_dir + "\\" + make_tstamp + "-PYGH"
	shutil.copytree(current_dir, create_folder_path)
	print("Created Backup: " + create_folder_path)

def backup_merge():
	print("**BACKUP**")
	create_backup()
	s()
	print("**FETCH MERGE**")
	fetch_merge()
	


######################################################################
######################################################################
######################################################################
##########################COMMANDS####################################
def print_list(the_list):
	nl()
	the_list.sort()
	for x in the_list:
		nl()
		print(x)
	nl()

list1 = [
	"keys: opens to GitHub new key page - you will need to be logged into GitHub on your current browser.",
	"exit: exits the current application",
	"create ssh: creats ssh key to use on GitHub page - then use the keys command to open GitHub new key page to insert ssh key",
	"custom: run a custom command in terminal",
	"push: commit and push current directory to GitHub",
	"clone: clones reposity to current dir - just need url from GitHub - example: https://github.com/username/the-repository.git",
	"pull: attempts to pull changes from GitHub - git will notify if errors in pull.",
	"force push: forces the push to GitHub - use same type of url like clone",
	"fetch: downloads remote files - so you can verify changes before merging",
	"merge: apply changes after fetch",
	"fetch merge: runs fetch then merge",
	"create backup: creates backup of all files in current directory",
	"backup merge: backs up current directory, then fetch and merge - this will save current data to folder located in current directory to eliminate losing data - is just a safe route if needed",
	]


print("\nType help to see commands\n")

while True:
	i = input("Enter Command: ")
	if i == "keys":
		open_git_to_keys()
	elif i == "exit":
		quit()
	elif i == "create ssh":
		create_ssh()
	elif i == "help":
		nl()
		print_list(list1)
	elif i == "custom":
		custom_command()
	elif i == "push":
		push_to_gh()
	elif i == "clone":
		clone()
	elif i == "pull":
		pull()
	elif i == "force push":
		force_push()
	elif i == "fetch":
		fetch()
	elif i == "merge":
		merge()
	elif i == "fetch merge":
		fetch_merge()
	elif i == "create backup":
		create_backup()
	elif i == "backup merge":
		backup_merge()





