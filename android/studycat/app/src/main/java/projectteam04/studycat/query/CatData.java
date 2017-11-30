package projectteam04.studycat.query;

import android.os.AsyncTask;
import android.util.Log;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.RequestParams;

import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 *
 * Created by Hongyu Wang on 11/30/2017.
 */

public class CatData {
    private static AsyncHttpClient client;
    private static StringBuilder baseURL;

    private static final String TAG = "ASYNC";
    public static void init(String ip){
        baseURL = new StringBuilder(ip);

        client = new AsyncHttpClient();
    }

    public static void signUp(String user, String pass, AsyncHttpResponseHandler res){
        client.removeAllHeaders();
        if (client == null) client = new AsyncHttpClient();

        client.addHeader("user", user);
        client.addHeader("password", pass);


        client.post(baseURL.append("/sign_up").toString(), res);    }

    public static void login(String user, String pass, AsyncHttpResponseHandler res){
        client.removeAllHeaders();
        if (client == null) client = new AsyncHttpClient();

        client.addHeader("user", user);
        client.addHeader("password", pass);


        client.post(baseURL.append("/login").toString(), res);
    }

    private CatData(){
    }
}
