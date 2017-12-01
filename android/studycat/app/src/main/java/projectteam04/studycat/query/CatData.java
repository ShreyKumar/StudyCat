package projectteam04.studycat.query;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;

import cz.msebera.android.httpclient.Header;

/**
 *
 * Created by Hongyu Wang on 11/30/2017.
 */

public class CatData {
    private static AsyncHttpClient client;
    private static String baseURL;
    private static String userName;
    private static String auth;
    private static final String TAG = "ASYNC";
    public static void init(String ip){
        baseURL = ip;

        client = new AsyncHttpClient();
    }

    public static void signUp(String user, String pass, AsyncHttpResponseHandler res){
        client.removeAllHeaders();
        if (client == null) client = new AsyncHttpClient();

        client.addHeader("user", user);
        client.addHeader("password", pass);


        client.post(baseURL + "/sign_up".toString(), res);    }

    public static void login(final String user, String pass, final AsyncHttpResponseHandler res){
        client.removeAllHeaders();
        if (client == null) client = new AsyncHttpClient();

        client.addHeader("user", user);
        client.addHeader("password", pass);


        client.post(baseURL.append("/login").toString(), new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                userName = user;
                auth = new String(responseBody);
                res.onSuccess(statusCode, headers, responseBody);
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                res.onFailure(statusCode, headers, responseBody, error);
            }
        });
    }

    public static void getAndroidStatus(AsyncHttpResponseHandler res){

        client.removeAllHeaders();

        client.addHeader("user", userName);
        client.addHeader("authkey", auth);
        client.get(baseURL + "/get_data", res);
    }


    public static void pushAndroidStatus(String status, AsyncHttpResponseHandler res){
        assert userName != null;
        assert auth != null;

        client.removeAllHeaders();

        client.addHeader("user", userName);
        client.addHeader("authkey", auth);
        client.addHeader("android_data", status);
        client.post(baseURL + "/input_data_android", res);
    }


    private CatData(){
    }
}
