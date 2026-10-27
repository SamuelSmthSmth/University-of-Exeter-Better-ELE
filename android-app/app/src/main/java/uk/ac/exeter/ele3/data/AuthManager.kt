package uk.ac.exeter.ele3.data

import android.content.Context
import android.content.SharedPreferences
import android.webkit.CookieManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class AuthManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("ele3_auth_prefs", Context.MODE_PRIVATE)

    private val _cookieString = MutableStateFlow<String?>(prefs.getString(KEY_COOKIES, null))
    val cookieString: StateFlow<String?> = _cookieString.asStateFlow()

    private val _isLoggedIn = MutableStateFlow(_cookieString.value?.isNotBlank() == true)
    val isLoggedIn: StateFlow<Boolean> = _isLoggedIn.asStateFlow()

    fun updateCookiesFromCookieManager() {
        val manager = CookieManager.getInstance()
        val panoptoCookies = manager.getCookie("https://recapexeter.cloud.panopto.eu")
        if (!panoptoCookies.isNullOrBlank()) {
            saveCookies(panoptoCookies)
        }
    }

    fun saveCookies(cookies: String) {
        prefs.edit().putString(KEY_COOKIES, cookies).apply()
        _cookieString.value = cookies
        _isLoggedIn.value = true
    }

    fun clearSession() {
        prefs.edit().remove(KEY_COOKIES).apply()
        _cookieString.value = null
        _isLoggedIn.value = false
        CookieManager.getInstance().removeAllCookies(null)
    }

    companion object {
        private const val KEY_COOKIES = "panopto_auth_cookies"

        @Volatile
        private var INSTANCE: AuthManager? = null

        fun getInstance(context: Context): AuthManager {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: AuthManager(context.applicationContext).also { INSTANCE = it }
            }
        }
    }
}
