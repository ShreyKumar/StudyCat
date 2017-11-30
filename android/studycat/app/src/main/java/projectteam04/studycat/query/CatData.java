package projectteam04.studycat.query;

import android.os.AsyncTask;

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


    public static void init(String ip){
        baseURL = new StringBuilder(ip);

        client = new AsyncHttpClient();
    }

    public static void signUp(String user, String pass, AsyncHttpResponseHandler res){
        if (client == null) client = new AsyncHttpClient();

        RequestParams params = new RequestParams();
        params.put("user", user);
        params.put("pass", pass);

        client.get(baseURL.append("/login").toString(), params, res);
    }

    public static void login(String user, String pass, AsyncHttpResponseHandler res){
        if (client == null) client = new AsyncHttpClient();

        RequestParams params = new RequestParams();
        params.put("user", user);
        params.put("pass", pass);

        client.get(baseURL.append("/login").toString(), params, res);
    }

    private CatData(){
    }
}
