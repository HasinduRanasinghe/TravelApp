package com.example.bustraveler;

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.bustraveler.R
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONException
import org.json.JSONObject
import java.io.IOException

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val firstNameEditText: EditText = findViewById(R.id.editTextFirstName)
        val lastNameEditText: EditText = findViewById(R.id.editTextLastName)
        val emailEditText: EditText = findViewById(R.id.editTextEmail)
        val passwordEditText: EditText = findViewById(R.id.editTextPassword)
        val registerButton: Button = findViewById(R.id.buttonRegister)

        registerButton.setOnClickListener {
            val firstName = firstNameEditText.text.toString()
            val lastName = lastNameEditText.text.toString()
            val email = emailEditText.text.toString()
            val password = passwordEditText.text.toString()

            // Make a POST request to your Express.js backend
            val client = OkHttpClient()
            val url = "http://192.168.8.168:8000/user/register"

            val json = JSONObject()
            json.put("firstName", firstName)
            json.put("lastName", lastName)
            json.put("emailAddress", email)
            json.put("password", password)

            val body =
                json.toString().toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())

            val request = Request.Builder()
                .url(url)
                .post(body)
                .build()

            client.newCall(request).enqueue(object : Callback {
                override fun onResponse(call: Call, response: Response) {
                    if (response.isSuccessful) {
                        try {
                            val responseData = response.body?.string()
                            val jsonResponse = JSONObject(responseData)
                            val success = jsonResponse.getBoolean("success")
                            val message = jsonResponse.getString("message")

                            runOnUiThread {
                                if (success) {
                                    // Registration was successful, navigate to login or another screen
                                    Toast.makeText(applicationContext,message, Toast.LENGTH_SHORT).show()
                                } else {
                                    // Registration failed, display an error message
                                    Toast.makeText(applicationContext,message, Toast.LENGTH_SHORT).show()
                                }
                            }
                        } catch (e: JSONException) {
                            e.printStackTrace()
                        }
                    }
                }

                override fun onFailure(call: Call, e: IOException) {
                    e.printStackTrace()
                }
            })
        }
    }
}
