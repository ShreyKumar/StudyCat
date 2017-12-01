package projectteam04.studycat;

import android.app.IntentService;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.NotificationCompat;

import com.google.gson.Gson;
import com.loopj.android.http.AsyncHttpResponseHandler;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

import cz.msebera.android.httpclient.Header;
import projectteam04.studycat.query.CatData;

/**
 * Created by darwin on 2017-11-27.
 */

public class BackgroundMonitorService extends IntentService {

    //Jeff's dank code
    public static final String
            ACTION_BACKGROUND = BackgroundMonitorService.class.getName() + "BackgroundMonitorBroadcast",
            EXTRA_COUNTER = "extra_counter";

    private Notification.Builder nb;
    private int c;
    public BackgroundMonitorService() {
        super("BackgroundMonitorService");
    }
    private int counter;

    @Override
    public int onStartCommand(@Nullable Intent intent, int flags, int startId) {
        nb = new Notification.Builder(this);
        c = 0;
        counter = 2;
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        System.out.println("Hi im onHandleIntent pls notice me");
        System.out.println(intent.getStringExtra("test"));
        showNotification();

        while (true) {
            try {
                updateCatState();
                Thread.sleep(5000);
                updateNotification();
                sendBroadcastMessage(counter);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }

    private void showNotification() {

        Intent notificationIntent = new Intent(this, BackgroundMonitorService.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, notificationIntent, 0);

        Notification n = nb
                .setContentTitle("Hi")
                .setContentText("notification btw")
                .setContentIntent(pendingIntent)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setTicker("HI")
                .setOngoing(true)
                .setPriority(Notification.PRIORITY_DEFAULT)
                .build();

        startForeground(1, n);
    }

    private void updateNotification() {
        nb.setContentText(Integer.toString(c++));

        startForeground(1, nb.build());
    }


    public void updateCatState() {
        CatData.getAndroidStatus(new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {

                System.out.println("uh");
                Gson gson = new Gson();
                String jsonInString = null;
                try {
                    jsonInString = new JSONObject(new String(responseBody)).toString();
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                System.out.println(jsonInString);
                Map<String, Object> data = new Gson().fromJson(jsonInString, Map.class);
                Double curr_state = (Double) data.get("current_cat_state");
                if (curr_state == null) {
                    curr_state = 2.0;
                }

                counter = (curr_state.intValue() - 1)%5;
                System.out.println(counter);
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                System.out.println("sigh.");
            }

        });


    }

    private void sendBroadcastMessage(Integer counter) {
        if (counter != null) {
            Intent intent = new Intent(ACTION_BACKGROUND);
            intent.putExtra(EXTRA_COUNTER, counter);
            LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
        }
    }


    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


}
