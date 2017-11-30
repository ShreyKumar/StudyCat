package projectteam04.studycat.query;

import android.os.AsyncTask;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;

import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 *
 * Created by Hongyu Wang on 11/30/2017.
 */

public class CatData {
    private static AsyncHttpClient client;

    public static void login(String user, String pass, AsyncHttpResponseHandler res){

    }

    private CatData(){
        client = new AsyncHttpClient();
    }
}
