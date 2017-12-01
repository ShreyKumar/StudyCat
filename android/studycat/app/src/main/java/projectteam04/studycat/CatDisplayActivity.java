package projectteam04.studycat;


import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;
import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.view.View;
import android.view.View.OnClickListener;

import com.loopj.android.http.AsyncHttpResponseHandler;

import com.google.gson.Gson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

import cz.msebera.android.httpclient.Header;
import projectteam04.studycat.query.CatData;

/**
 * Created by jefflin on 2017-11-30.
 */

public class CatDisplayActivity extends AppCompatActivity {

    // Image references
    int[] imageArray = { R.drawable.cat_0,
            R.drawable.cat_1,
            R.drawable.cat_2,
            R.drawable.cat_3,
            R.drawable.cat_4};

    // UI references.
    ImageView catImage;
    Button button;
    int counter = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cat_display);

        Intent intent = getIntent();
        catImage = (ImageView) findViewById(R.id.catImageView);

        doStuff();
        catImage.setImageResource(imageArray[counter]);
    }

    public void doStuff() {

        CatData.getAndroidStatus(new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
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


}
