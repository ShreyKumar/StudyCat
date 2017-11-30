package projectteam04.studycat;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private final int NOTIFICATION_ID = 0;

    Intent monitorService;
    Button btn;
    int c;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btn = findViewById(R.id.button);
        c = 0;
        //notifBuilder = new Notification.Builder(this);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //updateNotification();
                startMonitor();
                c++;
            }
        });

    }

    private void startMonitor() {
        monitorService = new Intent(this, BackgroundMonitorService.class);
        this.startService(monitorService);
    }


/*    private void updateNotification() {

        if (nManager == null) {
            showNotification();
        }

        notifBuilder.setContentText(Integer.toString(c));

        nManager.notify(NOTIFICATION_ID,
                notifBuilder.build());
    }*/
}
