package com.teddymalhan.util;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GitHubURLParser {
    public static Map<String, String> parseUrl(String url) {
        Pattern pattern = Pattern.compile("https://github\\.com/([^/]+)/([^/]+)/commit/([a-f0-9]+)");
        Matcher matcher = pattern.matcher(url);
        if (matcher.matches()) {
            Map<String, String> result = new HashMap<>();
            result.put("owner", matcher.group(1));
            result.put("repo", matcher.group(2));
            result.put("sha", matcher.group(3));
            return result;
        } else {
            throw new IllegalArgumentException("Invalid GitHub commit URL.");
        }
    }
}
