from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html", text="hello")

@app.route("/user")
def user():
    return render_template("user.html", text="hello")

if __name__ == "__main__":
    app.run(port=5000, debug=True)