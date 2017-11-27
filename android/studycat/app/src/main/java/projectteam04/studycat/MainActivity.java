package projectteam04.studycat;

import android.app.Notification;
import android.app.NotificationManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    NotificationManager nManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        showNotification();
    }

    private void showNotification() {
        nManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        Notification n = new Notification.Builder(this)
                .setContentTitle("Hi")
                .setContentText("notification btw")
                .setOngoing(true)
                .setSmallIcon(R.mipmap.ic_launcher)
                .build();
        nManager.notify(0, n);
    }
}
