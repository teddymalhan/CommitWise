package com.teddymalhan.tests;

import java.util.Map;
import com.teddymalhan.util.GitHubURLParser;

public class GitHubUrlParserTest {

    public static void main(String[] args) {
        // Test 1: Valid URL
        String validUrl = "https://github.com/owner/repo/commit/abc123def456";
        try {
            Map<String, String> result = GitHubURLParser.parseUrl(validUrl);
            System.out.println("Test 1 Passed: " + result);
        } catch (Exception e) {
            System.out.println("Test 1 Failed: " + e.getMessage());
        }

        // Test 2: Invalid URL (no commit path)
        String invalidUrl = "https://github.com/owner/repo/pull/123";
        try {
            GitHubURLParser.parseUrl(invalidUrl);
            System.out.println("Test 2 Failed: Invalid URL was accepted");
        } catch (Exception e) {
            System.out.println("Test 2 Passed: " + e.getMessage());
        }

        // Test 3: Invalid URL (no owner and repo)
        String invalidUrl2 = "https://github.com/commit/abc123def456";
        try {
            GitHubURLParser.parseUrl(invalidUrl2);
            System.out.println("Test 3 Failed: Invalid URL was accepted");
        } catch (Exception e) {
            System.out.println("Test 3 Passed: " + e.getMessage());
        }

        // Test 4: Invalid URL (non-GitHub URL)
        String invalidUrl3 = "https://bitbucket.org/owner/repo/commit/abc123def456";
        try {
            GitHubURLParser.parseUrl(invalidUrl3);
            System.out.println("Test 4 Failed: Invalid URL was accepted");
        } catch (Exception e) {
            System.out.println("Test 4 Passed: " + e.getMessage());
        }

        // Test 5: Valid URL with long commit hash
        String validUrl2 = "https://github.com/owner/repo/commit/abc123def4567890abcdef1234567890abcdef12";
        try {
            Map<String, String> result = GitHubURLParser.parseUrl(validUrl2);
            System.out.println("Test 5 Passed: " + result);
        } catch (Exception e) {
            System.out.println("Test 5 Failed: " + e.getMessage());
        }
    }
}