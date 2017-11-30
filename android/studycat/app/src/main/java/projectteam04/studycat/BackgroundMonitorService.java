package projectteam04.studycat;

import android.app.IntentService;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v7.app.NotificationCompat;

/**
 * Created by darwin on 2017-11-27.
 */

public class BackgroundMonitorService extends IntentService {

    private Notification.Builder nb;
    private int c;
    public BackgroundMonitorService() {
        super("BackgroundMonitorService");
    }

    @Override
    public int onStartCommand(@Nullable Intent intent, int flags, int startId) {
        nb = new Notification.Builder(this);
        c = 0;
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        System.out.println("Hi im onHandleIntent pls notice me");
        showNotification();

        while (true) {
            try {
                Thread.sleep(500);
                updateNotification();
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

}
