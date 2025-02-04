import secrets

# Generate a new secret key
new_secret_key = secrets.token_hex(32)

# Read the existing .env file if it exists
env_file_path = ".env"
env_data = []

try:
    with open(env_file_path, "r") as env_file:
        env_data = env_file.readlines()
except FileNotFoundError:
    pass  # If the file doesn't exist, we'll create a new one

# Update or add the SECRET_KEY
updated_env_data = []
key_found = False
for line in env_data:
    if line.startswith("SECRET_KEY="):
        updated_env_data.append(f"SECRET_KEY={new_secret_key}\n")
        key_found = True
    else:
        updated_env_data.append(line)

# If SECRET_KEY wasn't found, append it
if not key_found:
    updated_env_data.append(f"SECRET_KEY={new_secret_key}\n")

# Write the updated content back to .env
with open(env_file_path, "w") as env_file:
    env_file.writelines(updated_env_data)

print("✅ Secret key updated in .env file")
